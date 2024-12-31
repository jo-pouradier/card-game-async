package middleware

import (
	"log"
	"net/http"
	"time"
)

func LoggingMiddleWare(log *log.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			startTime := time.Now()
			next.ServeHTTP(w, r)
			log.Printf("METHOD:%s; URL:%s; DURATION:%v;", r.Method, r.URL, time.Since(startTime))
		})
	}
}
