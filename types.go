package main

type Result struct {
	StatusCode   int      `json:"statusCode"`
	HttpStatus   string   `json:"httpStatus"`
	BodyContent  string   `json:"bodyContent"`
	ErrorContent string   `json:"errorContent"`
	ContentType  string   `json:"contentType"`
	Duration     string   `json:"duration"`
	Headers      []Header `json:"headers"`
}

type Header struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type Body struct {
	Type    string `json:"type"`
	Payload string `json:"payload"`
}

type Keyval struct {
	ID     string `json:"id"`
	Key    string `json:"key"`
	Value  string `json:"value"`
	Active bool   `json:"active"`
}

type Request struct {
	ID      string   `json:"id"`
	Name    string   `json:"name"`
	ColID   string   `json:"col_id"`
	Crud    string   `json:"crud"`
	Url     string   `json:"url"`
	Body    Body     `json:"body"`
	Params  []Keyval `json:"params"`
	Headers []Keyval `json:"headers"`
}

type ReqNames struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Crud string `json:"crud"`
}

type SmartCollection struct {
	ID       string     `json:"id"`
	Name     string     `json:"name"`
	Requests []ReqNames `json:"requests"`
}

type FullCollection struct {
	ID       string    `json:"id"`
	Name     string    `json:"name"`
	Requests []Request `json:"requests"`
}
