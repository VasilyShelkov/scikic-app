import fetch from 'isomorphic-fetch';

const scikicUrl = 'http://dev.scikic.org';

/**
 * Starts a new Promise chain, resolving immediately.
 * @param callback Must return a Promise.
 * @returns {Promise}
 */
export const newPromiseChain = () => (
  new Promise((resolve) => {
    resolve();
  })
);

/**
 * Generates the boilerplate headers for a JSON GET request
 * @returns {{method: string, headers: {Accept: string, Content-Type: string}}}
 */
export const makeGetHeader = () => ({
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Creates a JSON POST fetch promise with a given url and body
 * @param url Where to POST, e.g. '/search'
 * @param body The body of the request, e.g. {'query': 'liverpool'}
 */
export const fetchPost = (url, body) => (
  fetch(scikicUrl + url, makePostHeader(body))
);

/**
 * Generates the boilerplate headers for a JSON POST request
 * @param body The body of the request, e.g. {'query': 'liverpool'}
 * @returns {{method: string, headers: {Accept: string, Content-Type: string}, body: *}}
 */
export const makePostHeader = (body) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
  },
  body: JSON.stringify(body),
});

/**
 *
 *
 */
export const exampleRecievedQuestion = {
  facts: {},
  question_string: {
    type: 'select',
    question: 'How do you travel to work?',
    options: [
      'Not in employment',
      'Work mainly from home',
      'Train/Tram/underground',
      'Bus',
      'Car/van',
      'Bicycle',
      'On Foot',
      'Other'
    ],
  },
  question: {
    detail: '',
    dataitem: 'travel',
    dataset: 'lifestyle'
  }
};

export const exampleRecievedInference = {
  facts: {
    guess_loc: {},
    age: 33,
    where: {
      uscensus: [{
        item: ['11', '001', ['006202'], null], probability: 0.002, level: 'blockgroup'
      }, {
        item: ['11', '001', ['010700'], null], probability: 0.017, level: 'blockgroup'
      }, {
        item: ['11', '001', ['010800'], null], probability: 0, level: 'blockgroup'
      }, {
        item: ['11', '001', ['010800'], null], probability: 0.821, level: 'blockgroup'
      }, {
        item: ['11', '001', ['010800'], null], probability: 0.16, level: 'blockgroup'
      }],
      city: [{
        item: ['Washington, DC', 'us'], probability: 1
      }],
      country: [{
        item: 'us', probability: 1
      }]
    },
    where_history: { error: 'no_fb_likes' }
  },
  relationships: [{
    parent: 'factor_gender',
    child: 'bg'
  }, {
    parent: 'factor_age',
    child: 'name'
  }, {
    parent: 'factor_age',
    child: 'bg'
  }],
  features: {
    item3: {
      distribution: [1],
      quartiles: { upper: 0, lower: 0, mean: 0 }
    },
    bg: {
      distribution: [
        0,
        0.09155555555555556,
        0,
        0.7893333333333333,
        0.11911111111111111
      ],
      quartiles: { upper: 3, lower: 3, mean: 2.936 }
    },
    factor_gender: {
      distribution: [
        0.5031111111111111,
        0.4968888888888889
      ],
      quartiles: { upper: 1, lower: 0, mean: 0.4968888888888889 }
    },
    item4_age: {
      distribution: [1],
      quartiles: { upper: 0, lower: 0, mean: 0 }
    },
    factor_age: {
      distribution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      quartiles: { upper: 33, lower: 33, mean: 33 }
    }
  },
  insights: {
    like_locations_debug: 'Note: I cant see your facebook likes.',
    uscensus_languages: 'Languages spoken in your area include Spanish, French, French Creole, Portuguese or Portuguese Creole, German, Russian, Gujarati, Hindi, Chinese, Japanese, Korean, Thai, Vietnamese, Tagalog, Arabic and an African language',
    uscensus_birthplace: '3% of people in your neighbourhood were born in your state.',
    uscensus_language_list: [211, 43, 14, 0, 13, 27, 0, 0, 0, 74, 0, 0, 0, 0, 5, 13, 0, 283, 15, 87, 0, 0, 8, 0, 7, 13, 0, 0, 24, 0, 10],
    uscensus_genderratio: 'There are 279% more women than men aged 22 to 27 living in your area.',
    uscensus_popage: '93% of people in your area are younger than you.',
    uscensus_birthplace_list: [161, 2859, 653, 1353, 596, 678],
    uscensus_debug_languages: '[[211, 43, 14, 0, 13, 27, 0, 0, 0, 74, 0, 0, 0, 0, 5, 13, 0, 283, 15, 87, 0, 0, 8, 0, 7, 13, 0, 0, 24, 0, 10]]'
  }
};

export const examplePreviousInferenceFeatures = [{
  distribution: [1],
  quartiles: {
    upper: 0,
    lower: 0,
    mean: 0,
  },
  node: 'factor_gender',
  color: '#1f77b4',
}];
