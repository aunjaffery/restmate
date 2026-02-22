package main

import (
	"fmt"
	"os"
	"path"

	"github.com/adrg/xdg"
)

func (a *App) initFile(fileName, t string) {
	folderName := "restmate"
	folderPath := path.Join(xdg.DataHome, folderName)
	filePath := path.Join(folderPath, fileName)
	writeStr := `[]`
	if t == "db" {
		a.db = filePath
	}
	if t == "env" {
		a.env = filePath
	}
	if t == "jar" {
		a.jarFile = filePath
	}
	if t == "settings" {
		a.settings = filePath
		writeStr = `{"theme": ""}`
	}
	if t == "session" {
		a.session = filePath
	}
	if _, err := os.Stat(filePath); err == nil {
		return
	} else if !os.IsNotExist(err) {
		fmt.Println("Error checking settings file:", err)
		return
	}
	if err := os.MkdirAll(folderPath, 0755); err != nil {
		fmt.Println("Error creating folder:", err)
		return
	}
	file, err := os.Create(filePath)
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer file.Close()
	_, err = file.WriteString(writeStr)
	if err != nil {
		fmt.Println("Error writing to file:", err)
		return
	}
}
