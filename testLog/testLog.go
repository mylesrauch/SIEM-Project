package testLog

import (
	"fmt"
	"errors"
	"syscall"
	"https://golang.org/x/sys/windows"
)

type Log struct {
	Handle windows.Handle
}

func main() {
	fmt.Println("Hello, World!")
}
