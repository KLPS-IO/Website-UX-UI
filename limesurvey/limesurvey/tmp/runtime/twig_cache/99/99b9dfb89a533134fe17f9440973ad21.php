<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* ./subviews/content/firstpage.twig */
class __TwigTemplate_06a8d84949b268b0eca8f824227e445b extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 17
        yield "
";
        // line 19
        yield "
";
        // line 21
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/messages/no_js_alert.twig");
        yield "

";
        // line 24
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/language_changer_first_page.twig");
        yield "

";
        // line 27
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/header/start_form.twig");
        yield " <!-- main form -->

    ";
        // line 30
        yield "    ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "EM", [], "any", false, false, true, 30), "ScriptsAndHiddenInputs", [], "any", false, false, true, 30), 30, $this->source);
        yield "

    ";
        // line 33
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/messages/welcome.twig");
        yield "

    ";
        // line 35
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/privacy/privacy.twig");
        yield "

    ";
        // line 38
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/navigator.twig");
        yield "
</form> <!-- main form -->

";
        // line 41
        yield LS_Twig_Extension::registerScript("BasicFirstPageThemeScripts", "
    if(window.basicThemeScripts === undefined){ 
        window.basicThemeScripts = new ThemeScripts(); 
    } 
", "POS_POSTSCRIPT");
        // line 45
        yield "
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/content/firstpage.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  91 => 45,  85 => 41,  78 => 38,  73 => 35,  67 => 33,  61 => 30,  56 => 27,  51 => 24,  46 => 21,  43 => 19,  40 => 17,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/content/firstpage.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/content/firstpage.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array();
        static $filters = array();
        static $functions = array("include" => 21, "registerScript" => 41);

        try {
            $this->sandbox->checkSecurity(
                [],
                [],
                ['include', 'registerScript'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
