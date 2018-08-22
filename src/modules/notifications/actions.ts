import { ActionTree } from 'vuex';
import { RootState } from '@/store';
import moment from 'moment-timezone';
import axios from 'axios';

import { getResponseData } from '@/stuff';

import {
  NotificationsState,
  EventInvitation,
  WishApplication,
  NOTIFICATION_INVITATION_ACCEPT,
  NOTIFICATION_INVITATION_REJECT,
  NOTIFICATION_INVITATIONS_FETCH,
  NOTIFICATION_INVITATIONS_SET_ALL,
  NOTIFICATION_INVITATIONS_REMOVE_ONE,
  NOTIFICATION_WISH_ACCEPT,
  NOTIFICATION_WISH_REJECT,
  NOTIFICATION_WISHES_FETCH,
  NOTIFICATION_WISHES_SET_ALL,
  NOTIFICATION_WISHES_REMOVE_ONE
} from './types';

const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

const fixDates = (event: EventInvitation | WishApplication) => {
  if (event.beginTime) {
    event.beginTime = moment(event.beginTime, DATETIME_FORMAT + 'Z').toDate();
  }
};

export const actions: ActionTree<NotificationsState, RootState> = {
  [NOTIFICATION_INVITATION_ACCEPT]: (
    { commit },
    invitation: EventInvitation
  ) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`event/invitation/${invitation.placeId}/accept`)
        .then((response) => {
          commit(NOTIFICATION_INVITATIONS_REMOVE_ONE, invitation);
          resolve();
        })
        .catch((error) => {
          console.log(NOTIFICATION_INVITATION_ACCEPT, error);
          reject();
        });
    });
  },

  [NOTIFICATION_INVITATION_REJECT]: (
    { commit },
    invitation: EventInvitation
  ) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`event/invitation/${invitation.placeId}/reject`)
        .then((response) => {
          commit(NOTIFICATION_INVITATIONS_REMOVE_ONE, invitation);
          resolve();
        })
        .catch((error) => {
          console.log(NOTIFICATION_INVITATION_ACCEPT, error);
          reject();
        });
    });
  },

  [NOTIFICATION_INVITATIONS_FETCH]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get('event/applications/invitations')
        .then((response) => getResponseData<EventInvitation[]>(response))
        .then((eventInvitations) => {
          eventInvitations.forEach(fixDates);
          commit(NOTIFICATION_INVITATIONS_SET_ALL, eventInvitations);
          resolve(eventInvitations);
        })
        .catch((error) => {
          console.log(NOTIFICATION_INVITATIONS_FETCH, error);
          reject();
        });
    });
  },

  [NOTIFICATION_WISH_ACCEPT]: (
    { commit },
    wishApplication: WishApplication
  ) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `event/wish/${wishApplication.placeId}/${
            wishApplication.wish.user.id
          }/accept`
        )
        .then((response) => {
          commit(NOTIFICATION_WISHES_REMOVE_ONE, wishApplication);
          resolve();
        })
        .catch((error) => {
          console.log(NOTIFICATION_WISH_ACCEPT, error);
          reject();
        });
    });
  },

  [NOTIFICATION_WISH_REJECT]: (
    { commit },
    wishApplication: WishApplication
  ) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `event/wish/${wishApplication.placeId}/${
            wishApplication.wish.user.id
          }/reject`
        )
        .then((response) => {
          commit(NOTIFICATION_WISHES_REMOVE_ONE, wishApplication);
          resolve();
        })
        .catch((error) => {
          console.log(NOTIFICATION_WISH_REJECT, error);
          reject();
        });
    });
  },

  [NOTIFICATION_WISHES_FETCH]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get('event/wishers')
        .then((response) => getResponseData<WishApplication[]>(response))
        .then((wishApplications) => {
          wishApplications.forEach(fixDates);
          commit(NOTIFICATION_WISHES_SET_ALL, wishApplications);
          resolve(wishApplications);
        })
        .catch((error) => {
          console.log(NOTIFICATION_WISHES_FETCH, error);
          reject();
        });
    });
  }
};
