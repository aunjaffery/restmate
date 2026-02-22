package main

import (
	"context"
	"fmt"
	"os"

	"github.com/goccy/go-json"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	if a.isQuitting {
		return false
	}
	dialog, err := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:    runtime.QuestionDialog,
		Title:   "Exit Application",
		Message: "Are you sure you want to quit? Your session will be saved automatically",
	})

	if err != nil || dialog != "Yes" {
		return true
	}
	a.isQuitting = true
	runtime.EventsEmit(ctx, "save-state-before-close")
	return true
}

func (a *App) SaveSession(r []Request) {
	if !a.isQuitting {
		a.isQuitting = true
	}
	b, err := json.Marshal(r)
	if err != nil {
		fmt.Printf("Marshal error: %v. Resetting session.\n", err)
		b = []byte("[]")
	}
	err = os.WriteFile(a.session, b, 0644)
	if err != nil {
		fmt.Printf("File write error: %v\n", err)
		_ = os.Remove(a.session)
	}
	runtime.Quit(a.ctx)
}

func (a *App) RestoreSession() (resp JSResp) {
	f, err := os.ReadFile(a.session)
	if err != nil {
		resp.Msg = "Error! Cannot restore session file"
		return
	}
	var r []Request
	err = json.Unmarshal(f, &r)
	if err != nil {
		resp.Msg = "Error! Cannot restore session file"
		return
	}
	resp.Success = true
	resp.Msg = "session fetched successfully"
	resp.Data = r
	return
}
