# workspaces-demo

A demo project showcasing Mastra workspaces and skills with different capability levels. Uses Anthropic's Claude models.

## Getting Started

1. Install dependencies:

```shell
npm install
```

2. Copy the example environment file and add your Anthropic API key:

```shell
cp .env.example .env
```

Then edit `.env` and add your [Anthropic API key](https://console.anthropic.com/).

3. Start the development server:

```shell
npm run dev
```

Open [http://localhost:4111](http://localhost:4111) in your browser to access [Mastra Studio](https://mastra.ai/docs/getting-started/studio).

## Agents

This project includes two agents that demonstrate how workspace capabilities affect what an agent can do.

### diagram-agent.ts (Full Capabilities)

- **Workspace:** `diagram-workspace`
- **Skills:** `mastra`, `beautiful-mermaid`
- **Filesystem:** ✅ Can read/write files
- **Sandbox:** ✅ Can execute scripts
- **Search:** ✅ BM25 keyword search

This agent has full capabilities. It can search indexed docs, create Mermaid diagrams, write `.mmd` files, and run the render script to produce SVG output.

### no-sandbox-agent.ts (Limited Capabilities)

- **Workspace:** `no-sandbox-workspace`
- **Skills:** `mastra`, `beautiful-mermaid`
- **Filesystem:** ✅ Can read/write files
- **Sandbox:** ❌ Cannot execute scripts
- **Search:** ✅ BM25 keyword search

This agent can access skills, search indexed docs, and write files, but cannot execute scripts. When asked to render a diagram, it can only write the `.mmd` file—it cannot run the render script to produce an SVG.

## Example Prompt

Try this prompt with both agents to see the difference:

> Create a diagram explaining how Mastra workspace skills can be used

- **diagram-agent:** Will render the diagram directly to SVG
- **no-sandbox-agent:** Can only write the `.mmd` file, cannot run the render script to produce SVG

To clean up generated SVG files between tests:

```shell
npm run clean
```

## Skills

Both agents have access to the same skills in `/skills`:

- [**mastra**](https://skills.sh/mastra-ai/skills/mastra) - Knowledge about Mastra framework concepts
- [**beautiful-mermaid**](https://skills.sh/intellectronica/agent-skills/beautiful-mermaid) - Tools and instructions for rendering Mermaid diagrams to SVG

## Search

Both workspaces have BM25 keyword search enabled, allowing agents to search indexed content without external dependencies.

**Configuration:**

```typescript
bm25: true,
autoIndexPaths: ['/docs', '/skills'],
```

**Indexed content:**

- `/docs` - Mastra workspace documentation (overview, filesystem, sandbox, search, skills)
- `/skills` - All skill files and references

When the workspace initializes, files in these directories are automatically indexed. Agents receive a search tool they can use to find relevant content by keyword.

**Example:** An agent asked to create a diagram about "workspace sandboxes" can search the indexed docs to find accurate information before generating the diagram.