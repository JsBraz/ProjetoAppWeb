package model

type Users_Location struct {
	ID         uint `gorm:"primary_key"`
	UserID     uint `gorm:"not null" json:"userId"`
	LocationID uint `gorm:"not null" json:"locationId"`
}
