import { useState } from 'react'

const services = [
  { name: 'Web application', detail: 'main · 2m ago', status: 'Healthy', color: 'green', latency: '142 ms' },
  { name: 'Payments API', detail: 'main · 8m ago', status: 'Healthy', color: 'green', latency: '86 ms' },
  { name: 'Worker queue', detail: 'main · 14m ago', status: 'Degraded', color: 'amber', latency: '1.8 s' },
]

const initialActivity = [
  { initials: 'MR', name: 'Maya Rodriguez', action: 'promoted build', target: 'v2.4.1 to production', time: '12 min ago', tone: 'coral' },
  { initials: 'TK', name: 'Theo Kim', action: 'approved rollback', target: 'worker-queue / #1842', time: '28 min ago', tone: 'violet' },
  { initials: 'SP', name: 'Samir Patel', action: 'updated secret', target: 'payments-api / staging', time: '1 hr ago', tone: 'blue' },
]

function App() {
  const [deploying, setDeploying] = useState(false)
  const [deployed, setDeployed] = useState(false)
  const [activity, setActivity] = useState(initialActivity)

  function deploy() {
    if (deploying) return
    setDeploying(true)
    window.setTimeout(() => {
      setDeploying(false)
      setDeployed(true)
      setActivity((current) => [
        { initials: 'YO', name: 'You', action: 'started deploy', target: 'v2.4.2 to production', time: 'just now', tone: 'green' },
        ...current,
      ])
    }, 900)
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">+</span><span>pulseboard</span></div>
        <div className="workspace-switcher"><span className="workspace-icon">N</span><span>Northstar team</span><span className="chevron">⌄</span></div>
        <nav>
          <p className="nav-label">Workspace</p>
          <a className="nav-item active" href="#overview"><span>◈</span> Overview</a>
          <a className="nav-item" href="#pipelines"><span>↗</span> Pipelines <b>6</b></a>
          <a className="nav-item" href="#services"><span>◌</span> Services</a>
          <a className="nav-item" href="#incidents"><span>!</span> Incidents <b className="alert-count">2</b></a>
          <p className="nav-label second">Manage</p>
          <a className="nav-item" href="#team"><span>♧</span> Team</a>
          <a className="nav-item" href="#settings"><span>⚙</span> Settings</a>
        </nav>
        <div className="sidebar-footer"><div className="avatar avatar-coral">YO</div><div><strong>Your account</strong><small>you@northstar.dev</small></div><span className="more">•••</span></div>
      </aside>

      <section className="content" id="overview">
        <header className="topbar"><div className="breadcrumbs"><span>Northstar</span><i>/</i><strong>Overview</strong></div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♢<span className="notification-dot" /></button><button className="help-button">? <span>Help center</span></button></div></header>
        <div className="page-heading"><div><p className="eyebrow">Thursday, September 3, 2026</p><h1>Good morning, preeti <span>✦</span></h1><p className="subtitle">Here’s what’s moving across your stack today.</p></div><button className={`deploy-button ${deployed ? 'success' : ''}`} onClick={deploy}>{deploying ? 'Deploying…' : deployed ? '✓ Deployed v2.4.2' : '＋ Deploy release'}</button></div>
        <div className="page-heading"><div><p className="eyebrow">Thursday, September 3, 2026</p><h1>Good morning, sajid and preeti <span>✦</span></h1><p className="subtitle">Here’s what’s moving across your stack today.</p></div><button className={`deploy-button ${deployed ? 'success' : ''}`} onClick={deploy}>{deploying ? 'Deploying…' : deployed ? '✓ Deployed v2.4.2' : '＋ Deploy release'}</button></div>

        <div className="metrics">
          <article className="metric-card"><div className="metric-top"><span className="metric-label">Deploy frequency</span><span className="metric-icon coral-icon">↗</span></div><strong>18.4 <small>/ week</small></strong><p className="trend up">↗ 12.8% <span>vs last week</span></p></article>
          <article className="metric-card"><div className="metric-top"><span className="metric-label">Change failure rate</span><span className="metric-icon violet-icon">ϟ</span></div><strong>4.2<small>%</small></strong><p className="trend down">↘ 2.1% <span>vs last week</span></p></article>
          <article className="metric-card"><div className="metric-top"><span className="metric-label">Lead time for changes</span><span className="metric-icon blue-icon">◷</span></div><strong>3.8 <small>hrs</small></strong><p className="trend up">↗ 8.4% <span>vs last week</span></p></article>
        </div>

        <div className="main-grid">
          <article className="panel pipeline-panel" id="pipelines"><div className="panel-heading"><div><h2>Release pipeline</h2><p>v2.4.2 · production</p></div><button className="ghost-button">View pipeline ↗</button></div><div className="pipeline"><div className="pipeline-line"><span className="pipeline-fill" /></div>{[['✓','Build','Passed','green'],['✓','Test','Passed','green'],['✓','Stage','Passed','green'],['◌','Deploy','In progress','amber']].map(([icon, label, state, tone]) => <div className="stage" key={label}><span className={`stage-icon ${tone}`}>{icon}</span><strong>{label}</strong><small className={tone}>{state}</small></div>)}</div><div className="pipeline-meta"><span>Triggered by <b>Samir Patel</b></span><span>Started 14 min ago</span><span>Commit <b className="commit">a91f2c</b></span></div></article>
          <article className="panel uptime-panel" id="services"><div className="panel-heading"><div><h2>Service health</h2><p>Last checked just now</p></div><span className="live-dot">● Live</span></div><div className="service-list">{services.map((service) => <div className="service" key={service.name}><div className={`service-status ${service.color}`} /><div className="service-copy"><strong>{service.name}</strong><small>{service.detail}</small></div><div className="service-right"><strong>{service.latency}</strong><small className={service.color}>{service.status}</small></div></div>)}</div><button className="full-link">View all services <span>→</span></button></article>
        </div>

        <article className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Across your workspace</p></div><button className="ghost-button">See all activity ↗</button></div><div className="activity-list">{activity.map((item, index) => <div className="activity-row" key={`${item.name}-${index}`}><div className={`avatar avatar-${item.tone}`}>{item.initials}</div><p><strong>{item.name}</strong> {item.action} <b>{item.target}</b></p><time>{item.time}</time></div>)}</div></article>
        <footer><span>Pulseboard status: <b className="status-online">● All systems operational</b></span><span>Updated a few seconds ago</span></footer>
      </section>
    </main>
  )
}

export default App
