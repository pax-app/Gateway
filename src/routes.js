import { Router } from 'express';
import request from 'request';
import * as CategoryRoutes from './app/services/Category';
import * as ReviewRoutes from './app/services/Review';
import * as PaxRoutes from './app/services/Pax';
import * as UserRoutes from './app/services/User';

const routes = new Router();

function userAuthentication(req, res, next) {
  //Checking for the presence of an Authorization header
  if (!req.header('Authorization')) {
    res.json({ Error: 'Missing authorization token' });
  }

  //User service URL at get user status route
  const url = 'http://pax-user.herokuapp.com/auth/status';

  //Set header with authorization token received
  const headers = {
    Authorization: String(req.header('Authorization')),
  };

  request(
    { headers: headers, url: url, method: 'GET' },
    (error, response, body) => {
      if (error) {
        res.send(error);
      }

      //If received response is not success, then send forbidden status
      if (JSON.parse(body)['message'] != 'success') {
        res.sendStatus(403);
      }

      //Else means authorized request, go to next step of the chain
      next();
    }
  );
}

//Category
routes.get('/api/v1/category/general', CategoryRoutes.getGeneralCategories);
routes.get('/api/v1/category/provider', CategoryRoutes.getProviderCategories);
routes.get(
  '/api/v1/category/provider/:general_category_id',
  CategoryRoutes.getProviderCategoriesFromGeneral
);

//Review
routes.get(
  '/api/v1/review/service_reviews/average/:evaluated_id',
  ReviewRoutes.getServiceReviewAverage
);
routes.get(
  '/api/v1/review/charisma_reviews/average/:evaluated_id',
  ReviewRoutes.getCharismaReviewAverage
);
routes.post('/api/v1/review/create_review', ReviewRoutes.createReview);

//Pax
routes.get('/api/v1/pax/consult_pax/:chat_id', PaxRoutes.getPaxExistence);
routes.get(
  '/api/v1/pax/finalized_pax/:user_kind/:id',
  PaxRoutes.getFinalizedPax
);
routes.get(
  '/api/v1/pax/initiated_pax/:user_kind/:id',
  PaxRoutes.getInitiatedPax
);
routes.get('/api/v1/pax/canceled_pax/:user_kind/:id', PaxRoutes.getCanceledPax);
routes.get('/api/v1/pax/pendent_pax/:user_kind/:id', PaxRoutes.getPendentPax);
routes.post('/api/v1/pax/upCreate', PaxRoutes.createPax);
routes.patch('/api/v1/pax/update_status', PaxRoutes.updatePaxStatus);
routes.patch('/api/v1/pax/update_motive', PaxRoutes.updatePaxMotive);

//User
routes.get(
  '/api/v1/user/provider_by_category/review/:provider_category_id',
  UserRoutes.getUsersByReview
);
routes.get(
  '/api/v1/user/provider_by_category/min_price/:provider_category_id',
  UserRoutes.getUsersByMinimumPrice
);
routes.get('/api/v1/user/get_address/:address_id', UserRoutes.getSingleAddress);
routes.get(
  '/api/v1/user/get_addresses/:user_id',
  UserRoutes.getAllUserAddresses
);
routes.delete(
  '/api/v1/user/:provider_id/category_provider/:provider_category_id',
  UserRoutes.deleteProviderCategoryRelationship
);
routes.post('/api/v1/user/add_address', UserRoutes.createAddress);
routes.post('/api/v1/user/auth/login', UserRoutes.loginUser);
routes.post('/api/v1/user/auth/registration', UserRoutes.createUser);
routes.get('/api/v1/user/auth/logout', UserRoutes.logoutUser);
routes.post(
  '/api/v1/user/provider_registration',
  userAuthentication,
  (req, res) => {
    //User service URL at provider_registration route
    const url = 'http://pax-user.herokuapp.com/provider_registration';
    request(
      {
        url: url,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        json: JSON.parse(JSON.stringify(req.body)), //Sending received JSON
      },
      (error, response, body) => {
        if (error) {
          res.send(error);
        }
        res.send(body);
      }
    );
  }
);

export default routes;
