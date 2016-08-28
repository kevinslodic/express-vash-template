var model = {
  meta: {
    pageTitle: '',
    metaKeywords: '',
    metaDescription: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  },
  validation: {
    email: '^([a-zA-Z0-9_\-\.]+)@@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$'
  }
}

module.exports = model;