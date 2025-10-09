# Aura Neuro — Frontend (Vite + Vue 3)

**Frontend** de la plataforma *Aura Neuro*. Interfaz web construida con Vite y Vue 3 que provee la landing pública y la aplicación autenticada (dashboard, monitor en tiempo real, teleconsulta, gestión de dispositivos). El proyecto sigue principios de **Domain-Driven Design (DDD)** con **Bounded Contexts** y aplica el **Assembler Pattern** para el manejo de DTOs y entidades de dominio. Para llamadas HTTP usamos **Axios**.

> **Estado:** Prototipo / MVP  
> **Stack:** Vite · Vue 3 · javascript · PrimeVue · PrimeFlex · PrimeIcons · Axios · Pinia · Vue Router

---

## Contenido

- [Aura Neuro — Frontend (Vite + Vue 3)](#aura-neuro--frontend-vite--vue-3)
  - [Contenido](#contenido)
  - [Descripción](#descripción)
  - [Stack tecnológico](#stack-tecnológico)
  - [Arquitectura (DDD \& Bounded Contexts)](#arquitectura-ddd--bounded-contexts)
  - [Assembler pattern \& Axios (ejemplo)](#assembler-pattern--axios-ejemplo)
- [Vue 3 + Vite](#vue-3--vite)

---

## Descripción

Este repositorio contiene el frontend de Aura Neuro: la interfaz que consume la API del backend y ofrece experiencia para pacientes, médicos y administradores. Incluye landing pública, panel de usuario (dashboard, monitor, historial), teleconsulta, gestión de dispositivos IoT y mapas. La app se organiza por Bounded Contexts para mantener el código alineado al dominio clínico.

---

## Stack tecnológico

- Vite  
- Vue 3 (Composition API)  
- TypeScript (recomendado)  
- PrimeVue (componentes UI)  
- PrimeFlex (utility CSS)  
- PrimeIcons  
- Axios (HTTP client)  
- Pinia (state management) o Vuex  
- Vue Router  
- Chart.js / ApexCharts (gráficas)  
- Mapbox GL o Leaflet (mapas)  
- Vitest / Cypress (tests)  
- Storybook (component library, opcional)

---

## Arquitectura (DDD & Bounded Contexts)

Aplicamos **Domain-Driven Design** para separar la aplicación en contextos independientes que reflejan áreas del dominio:

**Ejemplo de Bounded Contexts:**
- `auth` — autenticación, OTP, sesiones.  
- `monitoring` — señales en tiempo real, gráficas, alarmas.  
- `devices` — registro y estado de IoT.  
- `telemedicine` — agenda, llamadas, historial clínico.  
- `patients` — perfil, consentimientos.  
- `admin` — gestión de usuarios, flota de dispositivos.

Cada contexto contiene: `domain` (entidades, value objects), `application` (use-cases), `adapters/ports` (API, websockets) y `ui` (pages/components). Esto reduce acoplamiento y facilita escalado y testing.

---

## Assembler pattern & Axios (ejemplo)

Usamos **assemblers** para transformar DTOs de la API en entidades del dominio y viceversa. Además centralizamos Axios con interceptores.  


# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
