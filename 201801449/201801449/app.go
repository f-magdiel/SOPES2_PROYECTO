package main

import (
	"context"
	"fmt"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/mem"
	"os"
	"os/exec"
	"strconv"
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

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetCPUPercentage() string {
	percent, err := cpu.Percent(0, false)
	if err != nil {
		return "Error"
	}
	//Data percentage to JSON
	per := strconv.Itoa(int(percent[0]))
	//fmt.Print("CPU: ")
	//fmt.Println(per)
	return per
}

func (a *App) GetDiskPercentage() string {
	usage, err := disk.Usage("/")
	if err != nil {
		return "Error"

	}
	//Data percentage to JSON
	per := strconv.Itoa(int(usage.UsedPercent))
	//fmt.Print("Disk: ")
	//fmt.Println(per)
	return per
}

// Get the RAM percentage
func (a *App) GetRAMPercentage() string {
	v, _ := mem.VirtualMemory()
	//Data percentage to JSON
	per := strconv.Itoa(int(v.UsedPercent))
	//fmt.Print("RAM: ")
	//fmt.Println(per)
	return per
}

func (a *App) GetPorts(pass string, permiso int) int {
	fmt.Println("Se ejecutó la función GetPorts")
	fmt.Println("Contraseña: " + pass)
	fmt.Println("Permiso: " + strconv.Itoa(permiso))

	if os.Getegid() != 0 {
		cmd := exec.Command("sudo", "-S", os.Args[0])
		cmd.Stdin = strings.NewReader(pass + "\n")
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		err := cmd.Run()
		if err != nil {
			return -1
		}
	}

	if permiso == 0 { //Si el permiso es 0, se cierran los puertos
		cmd := exec.Command("sudo", "-S", "chmod", "0000", "/media")
		cmd.Stdin = strings.NewReader(pass + "\n")
		err := cmd.Run()
		cmd.Wait()

		if err != nil {
			fmt.Println("Ocurrió un error al ejecutar el comando para cerrar los puertos")
			fmt.Println(err)
			return -2
		}
		fmt.Println("Puertos cerrados")
		return 0
	} else if permiso == 1 { //Si el permiso es 1, se abren los puertos
		cmd := exec.Command("sudo", "-S", "chmod", "0777", "/media")
		cmd.Stdin = strings.NewReader(pass + "\n")
		err := cmd.Run()
		cmd.Wait()

		if err != nil {
			fmt.Println("Ocurrió un error al ejecutar el comando para abrir los puertos")
			fmt.Println(err)
			return -3
		}
		fmt.Println("Puertos abiertos")
		return 1
	} else {
		return -4
	}
	return -1
}
