package main

import (
	"fmt"
	"os"
	"os/exec"
	"time"
)

func main() {

	ExecLogs()

	for {
		// ciclado
	}
}

func ExecLogs() {
	go func() {
		for {

			time.Sleep(time.Second)

			cmd := exec.Command("inotifywait", "-r", "/media/fmagdiel/USB_MEDIA")
			output, err := cmd.Output()
			if err != nil {
				fmt.Println(err)
			} else {
				Write(string(output))
			}
		}
	}()
}

func Write(pMensaje string) {
	now := time.Now()
	formattedTime := now.Format(time.RFC3339)

	log := formattedTime + " " + pMensaje

	file, err := os.OpenFile("logs.txt", os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
	if err != nil {
		fmt.Println(err)
	}
	defer file.Close()

	_, err = fmt.Fprintln(file, log)
	if err != nil {
		fmt.Println(err)
	}
}
