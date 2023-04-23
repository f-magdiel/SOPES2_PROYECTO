package main

import (
	"context"
	"fmt"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/mem"
	"strconv"
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
	fmt.Print("CPU: ")
	fmt.Println(per)
	return per
}

func (a *App) GetDiskPercentage() string {
	usage, err := disk.Usage("/")
	if err != nil {
		return "Error"

	}
	//Data percentage to JSON
	per := strconv.Itoa(int(usage.UsedPercent))
	fmt.Print("Disk: ")
	fmt.Println(per)
	return per
}

// Get the RAM percentage
func (a *App) GetRAMPercentage() string {
	v, _ := mem.VirtualMemory()
	//Data percentage to JSON
	per := strconv.Itoa(int(v.UsedPercent))
	fmt.Print("RAM: ")
	fmt.Println(per)
	return per
}
