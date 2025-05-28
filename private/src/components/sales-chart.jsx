"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import zoomPlugin from "chartjs-plugin-zoom"

Chart.register(zoomPlugin) // Registra el plugin de zoom

export default function SalesChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const chartData = {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      datasets: [
        {
          label: "Ventas 2023",
          data: [65, 78, 90, 85, 180, 190, 160, 210, 140, 190, 150, 130],
          borderColor: "#E53E3E",
          backgroundColor: "rgba(229, 62, 62, 0.1)",
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#E53E3E"
        },
        {
          label: "Ventas 2022",
          data: [45, 60, 75, 70, 160, 170, 140, 180, 120, 160, 130, 110],
          borderColor: "#4299E1",
          backgroundColor: "rgba(66, 153, 225, 0.1)",
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#4299E1"
        }
      ]
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true
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
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)"
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index
            alert(`Mes seleccionado: ${chartData.labels[index]}`)
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}