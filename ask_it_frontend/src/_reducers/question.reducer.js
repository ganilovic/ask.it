import { questionConstants } from '../_constants';

export function questions(state = {}, action) {
  switch (action.type) {
    case questionConstants.GETALL_SUCCESS:
      return {
        items: action.questions
      };
    case questionConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
