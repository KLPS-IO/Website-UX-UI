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

/* ./subviews/header/progress_bar.twig */
class __TwigTemplate_c854f6cce7cc6ef9ecc27b43b5ba800d extends Template
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
        // line 19
        if ((((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "showprogress", [], "any", false, false, true, 19) == "Y") && (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "format", [], "any", false, false, true, 19) != "A")) &&  !CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 19))) {
            // line 20
            yield "    ";
            $context["progressValue"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "progress", [], "any", false, false, true, 20), "value", [], "any", false, false, true, 20);
            // line 21
            yield "    <!-- Top container -->
    <div class=\"";
            // line 22
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 22), "topcontainer", [], "any", false, false, true, 22), 22, $this->source);
            yield " container-fluid\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 22), "topcontainer", [], "any", false, false, true, 22), 22, $this->source);
            yield " >
        <div class=\"row justify-content-center\">
            <div class=\"";
            // line 24
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 24), "topcontent", [], "any", false, false, true, 24), 24, $this->source);
            yield " col-12 col-xl-8\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 24), "topcontent", [], "any", false, false, true, 24), 24, $this->source);
            yield ">
                <div class=\"ls-progress-container\" data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\"
                     title=\"";
            // line 26
            yield sprintf(gT("You have completed %s%% of this survey"), $this->sandbox->ensureToStringAllowed(($context["progressValue"] ?? null), 26, $this->source));
            yield "\">
                    <div class=\"visually-hidden\">";
            // line 27
            yield sprintf(gT("You have completed %s%% of this survey"), $this->sandbox->ensureToStringAllowed(($context["progressValue"] ?? null), 27, $this->source));
            yield "</div>
                    <div class=\"";
            // line 28
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 28), "progress", [], "any", false, false, true, 28), 28, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 28), "progress", [], "any", false, false, true, 28), 28, $this->source);
            yield " aria-hidden=\"true\" data-bs-placement=\"bottom\">
                        <div class=\"";
            // line 29
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 29), "progressbar", [], "any", false, false, true, 29), 29, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 29), "progressbar", [], "any", false, false, true, 29), 29, $this->source);
            yield " style=\"width: ";
            yield $this->sandbox->ensureToStringAllowed(($context["progressValue"] ?? null), 29, $this->source);
            yield "%;\">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
";
        }
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/header/progress_bar.twig";
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
        return array (  76 => 29,  70 => 28,  66 => 27,  62 => 26,  55 => 24,  48 => 22,  45 => 21,  42 => 20,  40 => 19,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/header/progress_bar.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/header/progress_bar.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 19, "set" => 20);
        static $filters = array();
        static $functions = array("sprintf" => 26, "gT" => 26);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
                [],
                ['sprintf', 'gT'],
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
