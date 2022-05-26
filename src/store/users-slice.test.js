import store  from "./index";
import { fetchUsers, searchUsers } from "./users-slice";

describe('Users slice', () => {

  it('fetchUsers function', async () => {
    let state = store.getState().users;
  
    await store.dispatch(fetchUsers(1));
    state = store.getState().users;

    const user = state.users.find((user) => user.name === 'C-3PO');
    expect(user?.height).toBe('167');
    expect(user?.mass).toBe('75');
    expect(state.users.length).toBe(10);
  });

  it('searchUsers function', async () => {
    let state = store.getState().users;
  
    await store.dispatch(searchUsers('C-3PO', 1));
    state = store.getState().users;

    expect(state.users.length).toBe(1);
  });

});