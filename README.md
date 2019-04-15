# Introduction 
React Templates for consistency in file creation 

# Getting Started
- Modify or add templates to the bin/generators folder
- Add new command mappings in bin/generator.js in the typeMap
- Create a new function that pulls in your template based on your new typeMap

# Build and Test
- Install as dev dependency to your project

# Execute
- In terminal run yarn react-get to receive help message on options
- yarn react-gen --atom input: will crate an functional component with the name of input.tsx at your terminal path
- yarn react-gen --redux src/component/input: will create a class component with redux connected in the src/component folder
