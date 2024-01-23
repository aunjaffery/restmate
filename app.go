package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
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

func (a *App) GetCollectionRequest(col_id string, req_id string) (*Request, error) {
	content, err := readOrCreateFile()
	if err != nil {
		return nil, fmt.Errorf("Error reading collections: %v", err)
	}
	var cols []FullCollection
	err = json.Unmarshal(content, &cols)
	if err != nil {
		fmt.Println("error", err)
		return nil, fmt.Errorf("Error in json unmarshal: %v", err)
	}
	fmt.Printf("%+v\n", cols)
	var req Request
	for i := range cols {
		if cols[i].ID == col_id {
			for r := range cols[i].Requests {
				if cols[i].Requests[r].ID == req_id {
					req = cols[i].Requests[r]
				}
			}
		}
	}
	return &req, nil
}
func (a *App) SaveToCollection(req Request) (bool, error) {
	fmt.Println("---- SaveToCollection ----")

	content, err := readOrCreateFile()
	if err != nil {
		return false, fmt.Errorf("Error reading collections: %v", err)
	}
	var cols []FullCollection
	err = json.Unmarshal(content, &cols)
	if err != nil {
		fmt.Println("error", err)
		return false, fmt.Errorf("Error in json unmarshal: %v", err)
	}
	fmt.Printf("%+v\n", cols)
	for i := range cols {
		if cols[i].ID == req.ColID {
			if len(cols[i].Requests) != 0 {
				for j := range cols[i].Requests {
					if cols[i].Requests[j].ID == req.ID {
						cols[i].Requests[j] = req
						break
					} else {
						cols[i].Requests = append(cols[i].Requests, req)
						break
					}
				}
			} else {
				cols[i].Requests = append(cols[i].Requests, req)
				break
			}
		}
	}
	b, err := json.Marshal(cols)
	if err != nil {
		fmt.Println("error", err)
		return false, fmt.Errorf("Error in json marshal: %v", err)
	}
	err = WriteFile(b)
	if err != nil {
		return false, fmt.Errorf("Error in Writing: %v", err)
	}
	return true, nil
}

func (a *App) GetCollections() ([]SmartCollection, error) {
	var err error
	content, err := readOrCreateFile()
	if err != nil {
		return nil, fmt.Errorf("Error reading collections: %v", err)
	}
	var cols []SmartCollection
	err = json.Unmarshal(content, &cols)
	if err != nil {
		fmt.Println("error", err)
		return nil, fmt.Errorf("Error in json unmarshal: %v", err)
	}
	fmt.Printf("%+v\n", cols)

	return cols, err
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
	startTime := time.Now()
	response, err := cli.Do(req)
	duration := time.Since(startTime).Round(time.Millisecond)
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
	result.Duration = duration.String()
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
