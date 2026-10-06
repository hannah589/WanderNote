// C. SETUP OF GA PAGE VIEWS
//triggered by the google event in _app.jsx
//appends url path and pass gtag
export const pageview = (url) => {
  window.gtag('config', process.env.GA_ID, {
    path_url: url,
  })
}