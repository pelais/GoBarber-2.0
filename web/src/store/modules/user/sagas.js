import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Types, updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const { data } = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(data));
  } catch (err) {
    toast.error('Não foi possível atualizar o Perfil. Por favor, verifique seus dados');

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile)]);
