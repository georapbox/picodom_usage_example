import {createNode, patch} from 'ultradom'; // eslint-disable-line
import {names} from './dummy/names';
import randomName from './random-name';

const root = document.getElementById('root');

class App {
  constructor() {
    this.state = {
      users: names.slice(0, 10).map(() => ({name: randomName(names), active: true}))
    };
  }

  render(rootNode) {
    return patch(this.view(this.state), rootNode);
  }

  handleChange(e, user) {
    user.active = !user.active;
    this.render(root);
  }

  onSubmit(e) {
    e.preventDefault();

    const ref = e.target.elements.username;

    this.state = Object.assign({}, this.state, {
      users: [...this.state.users, {name: ref.value, active: true}]
    });

    ref.value = randomName(names);
    ref.focus();

    this.render(root);
  }

  view(state) {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-12 mt-3 mb-3">
            <h1>Ultradom micro-library usage example</h1>

            <form class="form-inline" id="form" onsubmit={e => this.onSubmit(e)}>
              <input
                class="form-control"
                id="username"
                name="username"
                type="text"
                placeholder="Add User"
                value={randomName(names)}
                autofocus required />

              <input class="btn btn-primary" type="submit" value="Submit"/>
            </form>
          </div>

          <div class="col-md-6">
            <table class="table table-striped table-bordered table-hover table-sm">
              <thead class="thead-inverse">
                <tr>
                  <th class="text-center">Active</th>
                  <th class="text-center">Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  state.users.map(user => {
                    return (
                      <tr class={`${!user.active ? 'table-danger' : ''}`}>
                        <td class="text-center">
                          <label class="d-block">
                            <input
                              type="checkbox"
                              checked={user.active}
                              onchange={e => this.handleChange(e, user)} />
                          </label>
                        </td>
                        <td class="text-center">{user.name}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>

          <div class="col-md-6">
            <pre class="p-2">
              {JSON.stringify(state, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

const app = new App();

app.render(root);
