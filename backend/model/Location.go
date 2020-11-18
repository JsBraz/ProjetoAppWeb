package model

import "github.com/jinzhu/gorm"

// swagger:model
type Location struct {
	gorm.Model `swaggerignore:"true"`
	Latitude   float32 `json:"latitude"`
	Longitude  float32 `json:"longitude"`
	Name       string  `json:"name"`
	People     int     `json:"people"`
}
