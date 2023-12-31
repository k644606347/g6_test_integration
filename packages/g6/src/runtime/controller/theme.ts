import registry from '../../stdlib';
import { IGraph } from '../../types';
import { ThemeSpecification } from '../../types/theme';
import { getCatExtensions, getExtension } from '../../util/extension';

/**
 * Manages theme extensions for graph.
 * Themes are the mapper from item's inner model to display model.
 */
export class ThemeController {
  public extension;
  public graph: IGraph;

  private themeConfig;
  private solver;
  public specification: ThemeSpecification;
  private themes: {
    [themeName: string]: ThemeSpecification;
  };

  constructor(graph: IGraph<any, any>) {
    this.graph = graph;
    this.tap();
  }
  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.extension = this.getExtension();
    this.themes = this.getThemes();
    this.graph.hooks.init.tap(this.onInit.bind(this));
    this.graph.hooks.themechange.tap(this.onThemeChange.bind(this));
  }

  /**
   * Get the extensions from useLib.
   */
  private getExtension() {
    const { theme = {} } = this.graph.getSpecification();
    this.themeConfig = theme;
    return theme
      ? getExtension(theme, registry.useLib, 'themeSolver')
      : undefined;
  }

  private getThemes() {
    return getCatExtensions(registry.useLib, 'theme');
  }

  /**
   * Graph init listener, create theme solver and generate theme
   */
  private onInit({ canvases }) {
    if (this.extension) {
      this.solver = new this.extension(this.themeConfig, this.themes);
      this.specification = this.solver.specification;
      if (this.specification) {
        // apply canvas style in theme to the background canvas dom
        const { canvas } = this.specification;
        const dom = canvases.background.getContextService().getDomElement();
        if (dom && dom.style) {
          Object.keys(canvas).forEach((key) => (dom.style[key] = canvas[key]));
        }
      }
    }
  }

  private onThemeChange({ canvases }) {
    if (!canvases) return;
    this.extension = this.getExtension();
    this.onInit({ canvases });
  }
}
