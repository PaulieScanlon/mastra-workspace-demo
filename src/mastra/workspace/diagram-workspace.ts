import { Workspace, LocalFilesystem, LocalSandbox } from '@mastra/core/workspace';
import { resolve } from 'path';

// mastra dev runs from src/mastra/public/, so go up 3 levels to project root
const DIAGRAMS_DIR = resolve(process.cwd(), '..', '..', '..', 'diagrams');

export const diagramWorkspace = new Workspace({
  id: 'diagram-workspace',
  name: 'Diagram Rendering Workspace',
  filesystem: new LocalFilesystem({ basePath: DIAGRAMS_DIR }),
  sandbox: new LocalSandbox({ workingDirectory: DIAGRAMS_DIR }),
  skills: ['/skills'],
});
