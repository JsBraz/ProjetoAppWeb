package model

import "github.com/jinzhu/gorm"

type Users struct {
	gorm.Model `swaggerignore:"true"`
	Username   string `gorm:"unique;not null" json:"username"`
	Password   string `gorm:"not null" json:"password"`
	Role       string `gorm:"not null" json:"role"`
	Locations  []Location
}
