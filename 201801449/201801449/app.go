package main

import (
	"context"
	"fmt"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
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
	fmt.Println(per)
	return per
}
