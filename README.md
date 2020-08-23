## Folder Structure

### .storybook
This is all of the global Storybook code

### public
The public folder, whose contents are output to the root of the built app.

## src/
### data/
The mock data used in the Storybook stories, should be formatted as the graphQL schema stipulates, not as the database is structured.

### routing/
All routing for the application

### store/
Most of the redux store code

### stories/
The built storybook code

### views/
All the views for the application, divided by domain where appropriate, and more generally as "scene","container", and "component" for more general widely-used code.
