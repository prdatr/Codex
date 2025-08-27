const { useState } = React;

function App() {
  const [page, setPage] = useState('config');

  const renderPage = () => {
    switch (page) {
      case 'config':
        return React.createElement(ConfigPage);
      case 'discovery':
        return React.createElement(DiscoveryPage);
      case 'project':
        return React.createElement(ProjectMgmtPage);
      case 'coding':
        return React.createElement(CodingAgentPage);
      case 'review':
        return React.createElement(CodeReviewPage);
      default:
        return React.createElement(ConfigPage);
    }
  };

  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(
      'nav',
      null,
      React.createElement('button', { onClick: () => setPage('config') }, 'Config'),
      React.createElement('button', { onClick: () => setPage('discovery') }, 'Discovery'),
      React.createElement('button', { onClick: () => setPage('project') }, 'Project'),
      React.createElement('button', { onClick: () => setPage('coding') }, 'Coding'),
      React.createElement('button', { onClick: () => setPage('review') }, 'Review')
    ),
    renderPage()
  );
}

function ConfigPage() {
  const [key, setKey] = useState('');
  const save = async () => {
    await fetch('http://localhost:4000/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    alert('Saved');
  };
  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Configuration'),
    React.createElement('input', {
      value: key,
      onChange: e => setKey(e.target.value),
      placeholder: 'Azure OpenAI key'
    }),
    React.createElement('button', { onClick: save }, 'Save')
  );
}

function DiscoveryPage() {
  const [text, setText] = useState('');
  const analyze = async () => {
    const res = await fetch('http://localhost:4000/api/discovery/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    alert(data.brd);
  };
  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Discovery'),
    React.createElement('textarea', {
      value: text,
      onChange: e => setText(e.target.value)
    }),
    React.createElement('button', { onClick: analyze }, 'Analyze')
  );
}

function ProjectMgmtPage() {
  const [name, setName] = useState('');
  const create = async () => {
    const res = await fetch('http://localhost:4000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    const data = await res.json();
    alert(`Project ${data.projectId} created`);
  };
  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Project Management'),
    React.createElement('input', {
      value: name,
      onChange: e => setName(e.target.value),
      placeholder: 'Project name'
    }),
    React.createElement('button', { onClick: create }, 'Create')
  );
}

function CodingAgentPage() {
  const generate = async () => {
    const res = await fetch('http://localhost:4000/api/coding/generate', {
      method: 'POST'
    });
    const data = await res.json();
    alert(data.status);
  };
  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Coding Agent'),
    React.createElement('button', { onClick: generate }, 'Generate Code')
  );
}

function CodeReviewPage() {
  const submit = async () => {
    const res = await fetch('http://localhost:4000/api/code-review/submit', {
      method: 'POST'
    });
    const data = await res.json();
    alert(data.status);
  };
  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Code Reviewer'),
    React.createElement('button', { onClick: submit }, 'Submit for Review')
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
