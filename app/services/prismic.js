import Cookie from 'js-cookie'
import Service from '@ember/service';
import PrismicJS from 'prismic-javascript';
import config from '../config/environment';

export default Service.extend({

  getApi() {
    const apiEndpoint = 'https://pix-site.cdn.prismic.io/api/v2'; 
    let options

    if (config.environment === 'development') {
      options = {
        accessToken: config.APP.PRISMIC_API_TOKEN,
      }

      const cookie = Cookie.get(PrismicJS.previewCookie)

      console.log('cookie', cookie)
    }

    return PrismicJS.getApi(apiEndpoint, options);
  },

  async getFaqMenu() {
    const api = await this.getApi();
    const document = await api.query(PrismicJS.Predicates.at('document.type', 'faq_menu'), { 'fetchLinks': 'faq_category.title' });
    return document.results[0];
  },

  async getFaqCategoryByUid(faqCategoryUid) {
    const api = await this.getApi();
    const document = await api.query(PrismicJS.Predicates.at('my.faq_category.uid', faqCategoryUid));
    return document.results[0];
  },

  async findFaqItemsByFaqCategory(faqCategory) {
    const api = await this.getApi();
    const faqItemIds = faqCategory.data.faq_items.map(document => document.faq_item.id);
    const documents = await api.getByIDs(faqItemIds);
    return documents.results;
  },

  async getPage(pageName) {
    const api = await this.getApi();
    return await api.getSingle(pageName);
  },

  async findNewsItems({ page, pageSize }) {
    const api = await this.getApi();
    const documents = await api.query(PrismicJS.Predicates.at('document.type', 'news_item'), {
      page,
      pageSize,
      orderings : '[document.first_publication_date desc]'
    });
    return documents.results;
  },

  async getNewsItemByUid(newsItemUid) {
    const api = await this.getApi();
    const document = await api.query(PrismicJS.Predicates.at('my.news_item.uid', newsItemUid));
    console.log('getNewsItemByUid', document)
    return document.results[0];
  },

  async getPreviewDocumentRoute(documentId, token) {
    console.log('getPreviewDocumentRoute');
    
    const api = await this.getApi();

    return api.previewSession(token, resolveDocumentLink, '/');
  },

});

function resolveDocumentLink(doc) {
  if (doc.type === 'news_item') {
    return ['news.show', doc.uid]
  }

  throw new Error('Document type not supported.')
}