package main

import (
	"fmt"
	"os"

	"github.com/adrg/xdg"
)

func readOrCreateFile() ([]byte, error) {
	// Try to read the file

	filePath, _ := xdg.DataFile("restmate/restmate.json")
	content, err := os.ReadFile(filePath)

	// Check if the file doesn't exist
	if os.IsNotExist(err) {
		fmt.Println("File does not exist. Creating a new file.")

		// Create the file
		err = os.WriteFile(filePath, []byte("[]"), 0644)
		if err != nil {
			return nil, err
		}

		// Read the newly created file
		content, err = os.ReadFile(filePath)
		if err != nil {
			return nil, err
		}
	} else if err != nil {
		// Other error occurred
		return nil, err
	}

	return content, nil
}
func WriteFile(data []byte) error {
	filePath, _ := xdg.DataFile("restmate/restmate.json")
	err := os.WriteFile(filePath, data, 0644)
	if err != nil {
		return err
	}
	return nil
}
