import { AbstractExperience } from '@soundworks/core/client';
import { render, html } from 'lit-html';
import renderInitializationScreens from '@soundworks/template-helpers/client/render-initialization-screens.js';

class ControllerExperience extends AbstractExperience {

  constructor(client : any, config : any, $container : Element | null) {
    super(client);

    this.config = config;
    this.$container = $container;
    this.rafId = null;

    // require plugins if needed

    renderInitializationScreens(client, config, $container);
  }

  async start() {
    super.start();

    window.addEventListener('resize', () => this.render());

    // Create a client side state
    this.controllerInputState = await this.client.stateManager.create('controllerInput');
    console.log('controllerInput:', this.controllerInputState.getValues());

    this.render();
  }

  render() {
    // debounce with requestAnimationFrame
    window.cancelAnimationFrame(this.rafId);

    // TODO: 
    // - We want to init the UI-Module adjustment views with the currently set global settings
    // - Updates should be send to the ControllerExperience on the server side and distributed via the globals state
    this.rafId = window.requestAnimationFrame(() => {
      render(html`
        <div style="padding: 20px">
          <h1 style="margin: 20px 0">${this.client.type} [id: ${this.client.id}]</h1>
          <input type="checkbox" name="applause-visible" @change=${ (e:any) => {this.controllerInputState.set({ applauseVisible: e.target.checked }); }}>
        </div>
      `, this.$container);
    });
  }
}

export default ControllerExperience;
