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

          <section>
            <input type="checkbox" name="stream-visible" @change=${ (e:any) => {this.controllerInputState.set({ streamVisible: e.target.checked }); }}>
            <label>Stream visible</label><br>

            <label>Stream URL</label><br>
            <input type="text" name="stream-url" @change=${ (e:any) => {this.controllerInputState.set({ streamUrl: e.target.value }); }}><br>
          </section>

          <section>
            <input type="checkbox" name="applause-visible" @change=${ (e:any) => {this.controllerInputState.set({ applauseVisible: e.target.checked }); }}>
            <label>Applause visible</label>
          </section>

          <section>
            <input type="checkbox" name="text-field-visible" @change=${ (e:any) => {this.controllerInputState.set({ textFieldVisible: e.target.checked }); }}>
            <label>Text field visible</label><br>

            <label>Text field: Heading</label><br>
            <input type="text" name="text-field-heading" @change=${ (e:any) => {this.controllerInputState.set({ textFieldHeading: e.target.value }); }}><br>

            <label>Text field: Content</label><br>
            <input type="text" name="text-field-content" @change=${ (e:any) => {this.controllerInputState.set({ textFieldContent: e.target.value }); }}>
          </section>
        </div>
      `, this.$container);
    });

    const testDataModelSuggestion = {
      modules : [
        {
          name: "applause",
          type: "one-dimensional-slider",
          active: true,
          options: {
            labelStart: "Slow clap",
            content: "Awesome applause"
          },
          outputChannels: [
            {
              type: "midi|osc",
              channel: 1, // as integer
              aggregation: {
                type: "none|median|average",
                filterLength: 10 // as integer | -1 = all available data
              }
            }
          ] 
        },
        {
          name: "text",
          type: "text-view",
          active: true,
          options: {
            heading: "Some heading",
            content: "Lorem ipsum dolor..."
          },
          outputChannels: [] 
        }
      ]
    }
  }
}

export default ControllerExperience;
