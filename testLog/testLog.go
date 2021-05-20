package main

import (
	"fmt"
	"errors"
	"syscall"
	"golang.org/x/sys/windows"
)

type Log struct {
	Handle windows.Handle
}

func main() {
	fmt.Println("Hello, World!")
}
