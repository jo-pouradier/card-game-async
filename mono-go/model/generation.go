package model

import "encoding/json"

type ImageGenerationDTO struct {
	CardID         uint   `json:"cardId"`
	ImagePrompt    *string `json:"imagePrompt"`
	ImageUrl       *string `json:"imgUrl"`
	GenerationType string `json:"generationType"`
}

func (i ImageGenerationDTO) GetData() (string, error) {
	data, err := json.Marshal(i)
	return string(data), err
}

func (i ImageGenerationDTO) GetJMSType() string {
	return "com.cpe.springboot.generation.ImageGenerationDTO"
}

type TextGenerationDTO struct {
	CardID         uint   `json:"cardId"`
	TextPrompt     *string `json:"textPrompt"`
	Text           *string `json:"text"`
	GenerationType string `json:"generationType"`
}

func (t TextGenerationDTO) GetData() (string, error) {
	data, err := json.Marshal(t)
	return string(data), err
}

func (t TextGenerationDTO) GetJMSType() string {
	return "com.cpe.springboot.generation.TextGenerationDTO"
}

type PropertiesGenerationDTO struct {
	CardID         uint    `json:"cardId"`
	Energy         float32 `json:"energy"`
	HP             float32 `json:"hp"`
	Attack         float32 `json:"attack"`
	Defence        float32 `json:"defence"`
	GenerationType string  `json:"generationType"`
}

func (p PropertiesGenerationDTO) GetData() (string, error) {
	data, err := json.Marshal(p)
	return string(data), err

}

func (p PropertiesGenerationDTO) GetJMSType() string {
	return "com.cpe.springboot.generation.PropertiesGenerationDTO"
}
