# Submission Notes: Shiptivitas Kanban Upgrade

This document outlines the technical enhancements and engineering decisions made to go above and beyond the initial requirements of the Kanban board challenge.

## 🏗️ Software Engineering & Architecture
- **State Management (Lifting State Up)**: Refactored the application architecture to move the source of truth to the root `App.js`. This enables real-time synchronization between the Kanban Board and the Global Navbar.
- **Controlled Components**: Implemented a unidirectional data flow where the Board notifies the parent of changes, ensuring high stability and preventing state desync bugs.
- **React 18 Upgrade**: Upgraded the project to React 18 and updated dependencies to ensure maximum performance and compatibility with modern browser standards.

## 🎨 UI/UX Excellence (Beyond Requirements)
- **Glassmorphism Design**: Implemented a sophisticated "frosted glass" UI for the swimlanes using `backdrop-filter: blur`, semi-transparent backgrounds, and crystal-effect borders.
- **Fixed-Height Sliding Lanes**: Developed a "Native App" feel where columns have a fixed height matching the viewport, with hidden scrollbars. This keeps the Navigation and Titles always visible while allowing vertical "sliding" of cards.
- **Responsive Layout**: Designed a custom grid that adapts seamlessly between Desktop and Mobile views.

## ⚙️ Advanced Features & Interactivity
- **Smart 4-Mode Filtering**: Developed an advanced sorting engine with four modes: Alphabetical (A-Z, Z-A) and Priority (Highest/Lowest). 
- **Alphabetical Tie-Breaking**: Implemented a logic where cards with equal priority are automatically sorted alphabetically to maintain a clean hierarchy.
- **High-Performance Physics Engine**: Created an interactive "YC Mascot" with a custom-built physics engine. It uses direct DOM manipulation and `requestAnimationFrame` to ensure 60 FPS performance without React rendering overhead. It features magnetic repulsion and viewport collision physics.
- **User Control Balance**: Maintained a balance between manual Drag & Drop freedom and on-demand automated sorting, giving the user full control over their workflow.

## 🌍 Internationalization
- **100% English Localization**: Translated all interface elements, sorting options, and data points to provide a cohesive, global-ready professional experience.

---
**Author**: Daniel Caldas
**Project**: Shiptivitas Kanban Board
