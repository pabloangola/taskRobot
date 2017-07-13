import { TaskRobotPage } from './app.po';

describe('task-robot App', () => {
  let page: TaskRobotPage;

  beforeEach(() => {
    page = new TaskRobotPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
