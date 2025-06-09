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

/* ./subviews/privacy/allinone_mode_welcome_privacy.twig */
class __TwigTemplate_cdabdc129808c469367c9a98b8ae42cc extends Template
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
        // line 20
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "format", [], "any", false, false, true, 20) == "A")) {
            // line 21
            yield "    ";
            if (( !CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "showwelcome", [], "any", true, true, true, 21) || ( !CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "showwelcome", [], "any", false, false, true, 21) != "N"))) {
                // line 22
                yield "        ";
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/messages/welcome.twig");
                yield "
    ";
            }
            // line 24
            yield "
    ";
            // line 25
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/privacy/privacy.twig");
            yield "
";
        }
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/privacy/allinone_mode_welcome_privacy.twig";
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
        return array (  54 => 25,  51 => 24,  45 => 22,  42 => 21,  40 => 20,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/privacy/allinone_mode_welcome_privacy.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/privacy/allinone_mode_welcome_privacy.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 20);
        static $filters = array();
        static $functions = array("include" => 22);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                [],
                ['include'],
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
