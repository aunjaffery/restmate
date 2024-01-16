package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"strings"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

}

type Result struct {
	StatusCode   int      `json:"statusCode"`
	HttpStatus   string   `json:"httpStatus"`
	BodyContent  string   `json:"bodyContent"`
	ErrorContent string   `json:"errorContent"`
	ContentType  string   `json:"contentType"`
	Headers      []Header `json:"headers"`
}
type Header struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

func (a *App) Run(method string, url string, body string, contentType string, headers []Header) (Result, error) {
	var err error
	var result Result
	req, err := http.NewRequest(method, url, bytes.NewReader([]byte(body)))
	if err != nil {
		return result, fmt.Errorf("NewRequest failed: %v", err)
	}
	req.Header.Set("Content-Type", contentType)
	req.Header.Set("User-Agent", "restmate/0.0.9")
	req.Header.Set("Accept", "*/*")
	req.Header.Set("Connection", "keep-alive")
	for _, h := range headers {
		if strings.TrimSpace(h.Key) != "" {
			req.Header.Set(h.Key, h.Value)
		}
	}
	cli := http.Client{}
	response, err := cli.Do(req)
	if err != nil {
		return result, fmt.Errorf("restmate:%v", err)
	}
	defer response.Body.Close()

	result.StatusCode = response.StatusCode
	result.HttpStatus = response.Status
	result.ContentType = response.Header.Get("Content-Type")
	result.Headers = parseResponseHeaders(&response.Header)
	buf, err := io.ReadAll(response.Body)
	if err != nil {
		return result, fmt.Errorf("read body error: %v", err)
	}
	result.BodyContent = string(buf)
	return result, nil

}

func parseResponseHeaders(data *http.Header) []Header {
	var result []Header
	for k, v := range *data {
		h := Header{}
		h.Key = k
		h.Value = strings.Join(v, "")
		result = append(result, h)
	}
	return result

}
