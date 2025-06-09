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

/* ./subviews/messages/justsaved.twig */
class __TwigTemplate_4fe1ce8a3fce532f97b5718aed189bef extends Template
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
        // line 1
        if (((intval(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 1), "showpopups", [], "any", false, false, true, 1)) >= 0) && CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "saved", [], "any", false, false, true, 1), "text", [], "any", false, false, true, 1))) {
            // line 2
            yield "    ";
            $context["savedClass"] = "success";
            // line 3
            yield "    ";
            if ( !CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "saved", [], "any", false, false, true, 3), "success", [], "any", false, false, true, 3)) {
                // line 4
                yield "        ";
                $context["savedClass"] = "error";
                // line 5
                yield "    ";
            }
            // line 6
            yield "    ";
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "active", [], "any", false, false, true, 6) != "Y")) {
                // line 7
                yield "        ";
                $context["savedClass"] = "info";
                // line 8
                yield "    ";
            }
            // line 9
            yield "    <div class=\"alert alert-";
            yield $this->sandbox->ensureToStringAllowed(($context["savedClass"] ?? null), 9, $this->source);
            yield " alert-dismissible fade in";
            if ((intval(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 9), "showpopups", [], "any", false, false, true, 9)) > 0)) {
                yield " ls-js-hidden";
            }
            yield " \" role=\"alert\">
        <button class=\"btn-close ls-no-js-hidden\" data-bs-dismiss=\"alert\"><span class=\"visually-hidden\">";
            // line 10
            yield gT("Close");
            yield "</span></button>
        ";
            // line 11
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "saved", [], "any", false, false, true, 11), "text", [], "any", false, false, true, 11), 11, $this->source);
            yield "
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
        return "./subviews/messages/justsaved.twig";
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
        return array (  76 => 11,  72 => 10,  63 => 9,  60 => 8,  57 => 7,  54 => 6,  51 => 5,  48 => 4,  45 => 3,  42 => 2,  40 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/messages/justsaved.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/messages/justsaved.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 1, "set" => 2);
        static $filters = array();
        static $functions = array("intval" => 1, "gT" => 10);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
                [],
                ['intval', 'gT'],
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
