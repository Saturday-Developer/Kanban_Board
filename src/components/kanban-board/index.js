import React, { Component } from 'react';
import './index.css';

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
        { name: '1', stage: 0 },
        { name: '2', stage: 0 }
      ],
      input: ''
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    const handleCreateTask = () => {
      if (this.state.input !== '') {
        let d = [].concat(this.state.tasks);
        d.push({ name: this.state.input, stage: 0 });
        this.setState({
          tasks: d,
          input: ''
        });
      }
    };

    const handleNextArrow = (idx, index, taskName) => {
      let d = [].concat(this.state.tasks);
      let selectedIndex = null;
      d.map((item, itemIndex) => {
        if (item.name == taskName) {
          selectedIndex = itemIndex;
        }
      });

      d[selectedIndex].stage = idx + 1;
      this.setState({
        tasks: d
      });
    };

    const handlePreviousArrow = (idx, index, taskName) => {
      let d = [].concat(this.state.tasks);
      let selectedIndex = null;
      d.map((item, itemIndex) => {
        if (item.name == taskName) {
          selectedIndex = itemIndex;
        }
      });

      d[selectedIndex].stage = idx - 1;
      this.setState({
        tasks: d
      });
    };

    const handleDelete = (idx, index, taskName) => {
      let d = [].concat(this.state.tasks);
      console.log(d);
      let selectedIndex = null;
      d.map((item, itemIndex) => {
        if (item.name == taskName) {
          selectedIndex = itemIndex;
        }
      });
      console.log(selectedIndex);

      d.splice(selectedIndex, 1);
      this.setState({
        tasks: d
      });
    };
    return (
      <div className='mt-20 layout-column justify-content-center align-items-center'>
        <section className='mt-50 layout-row align-items-center justify-content-center'>
          <input
            id='create-task-input'
            type='text'
            className='large'
            placeholder='New task name'
            data-testid='create-task-input'
            value={this.state.input}
            onChange={e => {
              this.setState({ input: e.target.value });
            }}
          />
          <button
            type='submit'
            className='ml-30'
            data-testid='create-task-button'
            onClick={handleCreateTask}
          >
            Create task
          </button>
        </section>

        <div className='mt-50 layout-row'>
          {stagesTasks.map((tasks, i) => {
            return (
              <div className='card outlined ml-20 mt-0' key={`${i}`}>
                <div className='card-text'>
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className='styled mt-50' data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return (
                        <li className='slide-up-fade-in' key={`${i}${index}`}>
                          <div className='li-content layout-row justify-content-between align-items-center'>
                            <span
                              data-testid={`${task.name
                                .split(' ')
                                .join('-')}-name`}
                            >
                              {task.name}
                            </span>
                            <div className='icons'>
                              <button
                                className='icon-only x-small mx-2'
                                disabled={i == 0 ? true : false}
                                onClick={() =>
                                  handlePreviousArrow(i, index, task.name)
                                }
                                data-testid={`${task.name
                                  .split(' ')
                                  .join('-')}-back`}
                              >
                                <i className='material-icons'>arrow_back</i>
                              </button>
                              <button
                                className='icon-only x-small mx-2'
                                disabled={i == 3 ? true : false}
                                data-testid={`${task.name
                                  .split(' ')
                                  .join('-')}-forward`}
                                onClick={() =>
                                  handleNextArrow(i, index, task.name)
                                }
                              >
                                <i className='material-icons'>arrow_forward</i>
                              </button>
                              <button
                                className='icon-only danger x-small mx-2'
                                data-testid={`${task.name
                                  .split(' ')
                                  .join('-')}-delete`}
                                onClick={() =>
                                  handleDelete(i, index, task.name)
                                }
                              >
                                <i className='material-icons'>delete</i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
