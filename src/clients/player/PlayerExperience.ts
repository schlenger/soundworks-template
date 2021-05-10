import { AbstractExperience } from '@soundworks/core/client';
import { render, html } from 'lit-html';
import renderInitializationScreens from '@soundworks/template-helpers/client/render-initialization-screens.js';

class PlayerExperience extends AbstractExperience {

  constructor(client : any, config : any, $container : Element | null) {
    super(client);

    this.config = config;
    this.$container = $container;
    this.rafId = null;
    this.currentGlobalsState = null;
    this.playerInputState = null;

    // require plugins if needed

    renderInitializationScreens(client, config, $container);
  }

  async start() {
    super.start();

    window.addEventListener('resize', () => this.render());

    // Create a client side state
    this.playerInputState = await this.client.stateManager.create('playerInput');
    console.log('playerInput:', this.playerInputState.getValues());

    const globalsState = await this.client.stateManager.attach('globals');
    this.currentGlobalsState = globalsState.getValues();
    
    globalsState.subscribe(async (updates : any) => {
      console.log('updates:', updates);
      this.currentGlobalsState = globalsState.getValues();
      // Render must be triggered manually:
      this.render();
    });
    console.log('globalsState:', globalsState.getValues());

    this.render();
  }

  render() {
    // debounce with requestAnimationFrame
    window.cancelAnimationFrame(this.rafId);

    this.rafId = window.requestAnimationFrame(() => {
      render(html`
        <div style="padding: 20px">
          <h1 style="margin: 20px 0">${this.client.type} [id: ${this.client.id}]</h1>
          <h2 style="margin: 20px 0">${ JSON.stringify(this.currentGlobalsState)}</h2>
          <input type="range" id="applause" .hidden=${!this.currentGlobalsState['applauseVisible']} min="0" max="1" @change=${ (e:any) => {this.playerInputState.set({ applause: parseInt(e.target.value) }); }}>
        </div>
      `, this.$container);
    });
  }
}

export default PlayerExperience;
