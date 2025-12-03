# HR Workflow Designer — README Checklist

Use this checklist to ensure your README includes all required sections for the assignment.

---

## 📌 Project Overview
- [ ] Brief description of the HR Workflow Designer prototype  
- [ ] Purpose & scope (visual workflow builder, node editing, testing sandbox)  
- [ ] Time-boxed note (4–6 hours, architecture > UI)

---

## 🔧 Tech Stack
- [ ] React (Vite or Next.js)  
- [ ] React Flow  
- [ ] TypeScript  
- [ ] Mock API layer (JSON Server / MSW / local mocks)  
- [ ] State management (if used)

---

## 📁 Folder Structure
- [ ] High-level architecture overview  
- [ ] Explain separation of:
  - [ ] Canvas logic  
  - [ ] Node components  
  - [ ] Form components  
  - [ ] API layer  
  - [ ] Hooks  
  - [ ] Utils / types  

---

## 🧩 Node Types Implemented
- [ ] Start Node  
- [ ] Task Node  
- [ ] Approval Node  
- [ ] Automated Step Node  
- [ ] End Node  

Each documented with:
- [ ] Purpose  
- [ ] Form fields / configuration options  

---

## 🎛️ Node Editing Panel
- [ ] Controlled form components  
- [ ] Dynamic, extendable form structure  
- [ ] Validation strategy  
- [ ] Node state and update flow

---

## 🗺️ Workflow Canvas Features
- [x] Drag-and-drop from sidebar  
- [ ] Add / remove nodes  
- [ ] Connect edges  
- [ ] Node selection → edit panel  
- [ ] Basic constraints (Start node first, etc.)  

---

## 🌐 Mock API Layer
- [ ] Description of `/automations` endpoint  
- [ ] Description of `/simulate` endpoint  
- [ ] How mock actions drive dynamic params  
- [ ] Setup instructions  

---

## 🧪 Workflow Test / Sandbox
- [ ] How workflow JSON is serialized  
- [ ] API call to `/simulate`  
- [ ] Rendering the step-by-step execution log  
- [ ] Validation logic (cycles, missing links)

---

## 🧱 Key Design Choices
- [ ] File structure decisions  
- [ ] Hooks, abstractions, and modular architecture  
- [ ] TypeScript typings for nodes and forms  
- [ ] Scalability considerations (adding new node types)

---

## ▶️ Running the Project
- [ ] Install instructions  
- [ ] Development commands  
- [ ] Mock API startup steps  
- [ ] How to access major features (canvas, forms, sandbox)

---

## 📦 Optional Enhancements (if implemented)
- [ ] Export / Import workflow  
- [ ] Node templates  
- [ ] Undo / Redo  
- [ ] Mini-map / Zoom controls  
- [ ] Visual validation errors  
- [ ] Auto-layout  
- [ ] Node version history  

---

## ⚠️ Assumptions
- [ ] Simplifications due to time constraints  
- [ ] Intentional design decisions  
- [ ] Any deviations from real-world workflow engines  

---
