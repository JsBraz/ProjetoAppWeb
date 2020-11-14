package model

import "github.com/jinzhu/gorm"

// swagger:model
type Location struct {
	gorm.Model `swaggerignore:"true"`
	Latitutde     int    `json:"Latitude"`
	Longitude     int    `json:"Longitude"`
	Name       string `json:"Name"`
}
