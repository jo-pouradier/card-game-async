package middleware

import (
	"github.com/prometheus/client_golang/prometheus"
	promMiddleware "github.com/slok/go-http-metrics/metrics/prometheus"
	metricsMiddleware "github.com/slok/go-http-metrics/middleware"
)



func NewMetricsMiddleware() (metricsMiddleware.Middleware, *prometheus.Registry) {
	// Create the Prometheus recorder
	promRegistry := prometheus.NewRegistry()
	recorder := promMiddleware.NewRecorder(promMiddleware.Config{
		Registry: promRegistry,
	})
	// Create the HTTP middleware
	middleware := metricsMiddleware.New(metricsMiddleware.Config{
		Recorder: recorder,
	})
	
	return middleware, promRegistry
}
