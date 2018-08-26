import { Module } from 'vuex';
import { RootState } from '@/store';

import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { LayoutState } from './types';

export * from './types';

// used pages

import {
  // @ts-ignore
  loginPageRoute,
  // @ts-ignore
  registrationPageRoute,
  // @ts-ignore
  processingAgreementPageRoute
} from '@/views/authorization';

// @ts-ignore
import { notificationsPageRoute } from '@/views/notifications';

import {
  // @ts-ignore
  eventsPageRoute,
  // @ts-ignore
  eventEditPageRoute,
  // @ts-ignore
  eventDetailPageRoute
} from '@/views/events';

// @ts-ignore
import { equipmentPageRoute, equipmentEditPageRoute } from '@/views/equipment';

// @ts-ignore
import { projectsPageRoute } from '@/views/projects';

// @ts-ignore
import { profilePageRoute } from '@/views/profile';

// @ts-ignore
import { usersPageRoute, settingsPageRoute } from '@/views/system';

export const state: LayoutState = {
  stuff: [loginPageRoute, registrationPageRoute, processingAgreementPageRoute],
  groups: [
    {
      name: 'general',
      title: 'Общее',
      sections: [
        {
          name: 'profile',
          title: 'Профиль',
          homeURL: '/profile',
          pages: [profilePageRoute]
        },
        {
          name: 'notifications',
          title: 'Уведомления',
          homeURL: '/notifications',
          pages: [notificationsPageRoute]
        },
        {
          name: 'events',
          title: 'События',
          homeURL: '/events',
          pages: [eventsPageRoute, eventDetailPageRoute, eventEditPageRoute]
        },
        {
          name: 'equipment',
          title: 'Оборудование',
          homeURL: '/equipment',
          pages: [equipmentPageRoute, equipmentEditPageRoute]
        },
        {
          name: 'projects',
          title: 'Проекты',
          homeURL: '/projects',
          pages: [projectsPageRoute]
        }
      ]
    },
    {
      name: 'system',
      title: 'Система',
      sections: [
        {
          name: 'users',
          title: 'Пользователи',
          homeURL: '/users',
          pages: [usersPageRoute]
        },
        {
          name: 'profileSettings',
          title: 'Настройки',
          homeURL: '/settings',
          pages: [settingsPageRoute]
        }
      ]
    }
  ]
};

export const layout: Module<LayoutState, RootState> = {
  state,
  getters,
  actions,
  mutations
};
