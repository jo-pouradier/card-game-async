package model

import "encoding/json"

type ImageGenerationDTO struct {
	CardID      uint   `json:"cardId,omitempty"`
	ImagePrompt string `json:"imagePrompt,omitempty"`
	ImageUrl    string `json:"imgUrl,omitempty"`
}

func (i ImageGenerationDTO) GetData() (string, error) {
	data, err := json.Marshal(i)
	return string(data), err
}

func (i ImageGenerationDTO) GetJMSType() string {
	return "ImageGenerationDTO"
}

type TextGenerationDTO struct {
	CardID     uint   `json:"cardId,omitempty"`
	TextPrompt string `json:"textPrompt,omitempty"`
	Text       string `json:"text,omitempty"`
}

func (t TextGenerationDTO) GetData() (string, error) {
	data, err := json.Marshal(t)
	return string(data), err
}

func (t TextGenerationDTO) GetJMSType() string {
	return "TextGenerationDTO"
}

type PropertiesGenerationDTO struct {
	CardID  uint    `json:"cardId,omitempty"`
	Energy  float32 `json:"energy,omitempty"`
	HP      float32 `json:"hp,omitempty"`
	Attack  float32 `json:"attack,omitempty"`
	Defence float32 `json:"defence,omitempty"`
}

func (p PropertiesGenerationDTO) GetData() (string, error) {
	data, err := json.Marshal(p)
	return string(data), err

}

func (p PropertiesGenerationDTO) GetJMSType() string {
	return "PropertiesGenerationDTO"
}
