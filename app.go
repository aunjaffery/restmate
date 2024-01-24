package main

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
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
	fmt.Println("---- GET Collection REQ----")
	content, err := readOrCreateFile()
	if err != nil {
		return nil, errors.New("Read error! corrupted json file")
	}
	var cols []FullCollection
	err = json.Unmarshal(content, &cols)
	if err != nil {
		return nil, errors.New("Unmarshal error! corrupted json file")
	}
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
func (a *App) SaveToCollection(req Request) ([]SmartCollection, error) {
	fmt.Println("---- SaveToCollection ----")

	content, err := readOrCreateFile()
	if err != nil {
		return nil, errors.New("Read error! corrupted json file")
	}
	var cols []FullCollection
	err = json.Unmarshal(content, &cols)
	if err != nil {
		fmt.Println("error", err)
		return nil, errors.New("Unmarshal error! corrupted json file")
	}
	for i := range cols {
		if cols[i].ID == req.ColID {
			if len(cols[i].Requests) != 0 {
				for j := range cols[i].Requests {
					if cols[i].Requests[j].ID == req.ID {
						cols[i].Requests[j] = req
						break
					} else if j == len(cols[i].Requests)-1 {
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
		return nil, errors.New("Marshal error! corrupted json file")
	}
	err = WriteFile(b)
	if err != nil {
		return nil, errors.New("Write error! corrupted json file")
	}
	var smCols []SmartCollection
	for i := range cols {
		var smReq []ReqNames
		for j := range cols[i].Requests {
			smReq = append(smReq, ReqNames{
				ID:   cols[i].Requests[j].ID,
				Name: cols[i].Requests[j].Name,
				Crud: cols[i].Requests[j].Crud,
			})
		}
		smCol := SmartCollection{
			ID:       cols[i].ID,
			Name:     cols[i].Name,
			Requests: smReq,
		}
		smCols = append(smCols, smCol)
	}
	return smCols, nil
}

func (a *App) GetCollections() ([]SmartCollection, error) {
	fmt.Println("---- GET ALL Collections ----")
	var err error
	content, err := readOrCreateFile()
	if err != nil {
		return nil, errors.New("Read error! corrupted json file")
	}
	var cols []SmartCollection
	err = json.Unmarshal(content, &cols)
	if err != nil {
		return nil, errors.New("Unmarshal error! corrupted json file")
	}
	// fmt.Printf("%+v\n", cols)

	return cols, err
}
func (a *App) CreateCollection(id string, name string) ([]SmartCollection, error) {
	fmt.Println("---- Create Collections ----")
	var err error
	content, err := readOrCreateFile()
	if err != nil {
		return nil, errors.New("Read error! corrupted json file")
	}
	var cols []FullCollection
	err = json.Unmarshal(content, &cols)
	if err != nil {
		return nil, errors.New("Unmarshal error! corrupted json file")
	}
	newCol := FullCollection{
		ID:       id,
		Name:     name,
		Requests: []Request{},
	}
	cols = append(cols, newCol)
	b, err := json.Marshal(cols)
	if err != nil {
		return nil, errors.New("Marshal error! corrupted json file")
	}
	err = WriteFile(b)
	if err != nil {
		return nil, errors.New("Write error! corrupted json file")
	}
	// fmt.Printf("%+v\n", cols)
	var smCols []SmartCollection
	for i := range cols {
		var smReq []ReqNames
		for j := range cols[i].Requests {
			smReq = append(smReq, ReqNames{
				ID:   cols[i].Requests[j].ID,
				Name: cols[i].Requests[j].Name,
				Crud: cols[i].Requests[j].Crud,
			})
		}
		smCol := SmartCollection{
			ID:       cols[i].ID,
			Name:     cols[i].Name,
			Requests: smReq,
		}
		smCols = append(smCols, smCol)
	}
	return smCols, nil
}
func (a *App) DeleteCollection(id string) ([]SmartCollection, error) {
	fmt.Println("---- Delete Collections ----")
	var err error
	content, err := readOrCreateFile()
	if err != nil {
		return nil, errors.New("Read error! corrupted json file")
	}
	var cols []FullCollection
	err = json.Unmarshal(content, &cols)
	if err != nil {
		return nil, errors.New("Unmarshal error! corrupted json file")
	}
	// delete a collection here...
	for i := range cols {
		if cols[i].ID == id {
			//delete logic

		}
	}
	b, err := json.Marshal(cols)
	if err != nil {
		return nil, errors.New("Marshal error! corrupted json file")
	}
	err = WriteFile(b)
	if err != nil {
		return nil, errors.New("Write error! corrupted json file")
	}
	// fmt.Printf("%+v\n", cols)
	var smCols []SmartCollection
	for i := range cols {
		var smReq []ReqNames
		for j := range cols[i].Requests {
			smReq = append(smReq, ReqNames{
				ID:   cols[i].Requests[j].ID,
				Name: cols[i].Requests[j].Name,
				Crud: cols[i].Requests[j].Crud,
			})
		}
		smCol := SmartCollection{
			ID:       cols[i].ID,
			Name:     cols[i].Name,
			Requests: smReq,
		}
		smCols = append(smCols, smCol)
	}
	return smCols, nil
}
func (a *App) RenameCollection(id string, name string) ([]SmartCollection, error) {
	fmt.Println("---- Rename Collections ----")
	var err error
	content, err := readOrCreateFile()
	if err != nil {
		return nil, errors.New("Read error! corrupted json file")
	}
	var cols []FullCollection
	err = json.Unmarshal(content, &cols)
	if err != nil {
		return nil, errors.New("Unmarshal error! corrupted json file")
	}
	for i := range cols {
		if cols[i].ID == id {
			cols[i].Name = name
			break
		}
	}
	b, err := json.Marshal(cols)
	if err != nil {
		return nil, errors.New("Marshal error! corrupted json file")
	}
	err = WriteFile(b)
	if err != nil {
		return nil, errors.New("Write error! corrupted json file")
	}
	// fmt.Printf("%+v\n", cols)
	var smCols []SmartCollection
	for i := range cols {
		var smReq []ReqNames
		for j := range cols[i].Requests {
			smReq = append(smReq, ReqNames{
				ID:   cols[i].Requests[j].ID,
				Name: cols[i].Requests[j].Name,
				Crud: cols[i].Requests[j].Crud,
			})
		}
		smCol := SmartCollection{
			ID:       cols[i].ID,
			Name:     cols[i].Name,
			Requests: smReq,
		}
		smCols = append(smCols, smCol)
	}
	return smCols, nil
}
func (a *App) ExportCollection(id string) (*FullCollection, error) {
	fmt.Println("---- Rename Collections ----")
	var err error
	content, err := readOrCreateFile()
	if err != nil {
		return nil, errors.New("Read error! corrupted json file")
	}
	var cols []FullCollection
	err = json.Unmarshal(content, &cols)
	if err != nil {
		return nil, errors.New("Unmarshal error! corrupted json file")
	}
	var col FullCollection
	for i := range cols {
		if cols[i].ID == id {
			col = cols[i]
			break
		}
	}
	return &col, nil
}

func (a *App) Run(method string, url string, body string, contentType string, headers []Header) (Result, error) {
	var err error
	var result Result
	req, err := http.NewRequest(method, url, bytes.NewReader([]byte(body)))
	if err != nil {
		return result, errors.New("Error! Request failed")
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
		return result, errors.New("Error! Request failed")
	}
	defer response.Body.Close()

	result.StatusCode = response.StatusCode
	result.HttpStatus = response.Status
	result.ContentType = response.Header.Get("Content-Type")
	result.Headers = parseResponseHeaders(&response.Header)
	buf, err := io.ReadAll(response.Body)
	if err != nil {
		return result, errors.New("Error! Cannot read response body")
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
