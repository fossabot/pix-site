import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  prismic: service(),

  async model({ documentId, token }) {
    const uid = await this.prismic.getPreviewDocument(documentId, token);

    return this.transitionTo('news.show', uid);
  },

});
