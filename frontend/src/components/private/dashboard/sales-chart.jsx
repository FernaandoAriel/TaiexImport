"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import zoomPlugin from "chartjs-plugin-zoom"
import useOrder from "./hooks/useOrder.js"
import { format } from "date-fns"
import { es } from "date-fns/locale"

Chart.register(zoomPlugin)

export default function OrdersPredictionChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const { orders, loading } = useOrder()

  useEffect(() => {
    if (!chartRef.current || loading) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const processOrdersData = () => {
      const ordersByMonth = {}
      
      orders.forEach(order => {
        const date = new Date(order.createdAt || order.date || Date.now())
        const monthYear = format(date, 'MMM yyyy', { locale: es })
        
        if (!ordersByMonth[monthYear]) {
          ordersByMonth[monthYear] = 0
        }
        ordersByMonth[monthYear]++
      })

      const labels = Object.keys(ordersByMonth)
      const data = Object.values(ordersByMonth)

      const predictions = []
      for (let i = 0; i < 3; i++) {
        const lastThreeMonths = data.slice(-3)
        const average = lastThreeMonths.reduce((sum, val) => sum + val, 0) / lastThreeMonths.length
        predictions.push(Math.round(average * (1 + (i * 0.1)))) 
      }

      return {
        labels: [...labels, ...['Próximo mes', 'En 2 meses', 'En 3 meses']],
        historicalData: [...data, ...Array(3).fill(null)],
        predictionData: [...Array(data.length).fill(null), ...predictions]
      }
    }

    const { labels, historicalData, predictionData } = processOrdersData()

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Órdenes históricas",
            data: historicalData,
            borderColor: "#3182CE",
            backgroundColor: "rgba(49, 130, 206, 0.1)",
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#3182CE",
            borderWidth: 2
          },
          {
            label: "Predicción de órdenes",
            data: predictionData,
            borderColor: "#38A169",
            backgroundColor: "rgba(56, 161, 105, 0.1)",
            borderDash: [5, 5],
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#38A169",
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: "xy"
            }
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: 0,
                yMax: 0,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                label: {
                  content: "Predicción",
                  enabled: true,
                  position: "right"
                }
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Órdenes'
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)"
            }
          },
          x: {
            title: {
              display: true,
              text: 'Periodo'
            },
            grid: {
              display: false
            }
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index
            const label = labels[index]
            const value = historicalData[index] || predictionData[index]
            alert(`Periodo: ${label}\nÓrdenes: ${value}`)
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [loading, orders])

  if (loading) {
    return <div className="w-full h-64 flex items-center justify-center">Cargando datos de órdenes...</div>
  }

  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Predicción de Órdenes</h2>
      <div className="w-full h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <p className="text-sm text-gray-500 mt-2">Use la rueda del mouse para hacer zoom. Haga clic en un punto para ver detalles.</p>
    </div>
  )
}